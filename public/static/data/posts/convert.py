# Add filename sanitizer for Windows
import json
import os
import re
import shutil
from datetime import datetime

INPUT_DIR = os.getcwd()
OUTPUT_DIR = os.path.join(INPUT_DIR, "output")

# Block type mapping
BLOCK_TYPES = {
    1: "paragraph",
    2: "image",
    3: "code"
}

# Clear output directory
if os.path.exists(OUTPUT_DIR):
    shutil.rmtree(OUTPUT_DIR)
os.makedirs(OUTPUT_DIR, exist_ok=True)

def sanitize_filename(title):
    # Replace invalid Windows filename characters with hyphens
    return re.sub(r'[\\/:*?"<>|]', '-', title.lower().replace(' ', '-'))

def convert_block(block):
    block_type_num = block.get("blockType")
    block_type_str = BLOCK_TYPES.get(block_type_num, "paragraph")
    new_block = block.copy()
    new_block["type"] = block_type_str
    if "blockType" in new_block:
        del new_block["blockType"]
    if "content" in new_block and new_block["type"] == "image":
        new_block["url"] = new_block["content"]
        del new_block["content"]
    return new_block

def convert_to_format(data, filename):
    blocks = data.get("blocks", [])
    converted_blocks = [convert_block(b) for b in blocks]
    # Format filename: YYYY-MM-dd-hh-mm-<title hyphenated>.json
    from datetime import UTC
    date_str = data.get("date")
    dt = None
    if date_str:
        # Try parsing M/d/YYYY format
        try:
            dt = datetime.strptime(date_str, "%m/%d/%Y")
        except Exception:
            # Try ISO or fallback to now
            try:
                dt = datetime.fromisoformat(date_str.replace("Z", ""))
            except Exception:
                dt = datetime.now(UTC)
    else:
        dt = datetime.now(UTC)
    title = data.get("title", "untitled")
    title_hyphen = sanitize_filename(title)
    filename_fmt = f"{dt.strftime('%Y-%m-%d-%H-%M')}-{title_hyphen}.json"
    return {
        "filename": filename_fmt,
        "title": data.get("title", ""),
        "type": data.get("type", "featured"),
        "tags": data.get("tags", []),
        "author": data.get("author", "Christopher Snay"),
        "cover": data.get("image", ""),
        "blocks": converted_blocks,
        "date": dt.replace(tzinfo=UTC).isoformat().replace("+00:00", "Z"),
        "updated": datetime.now(UTC).isoformat().replace("+00:00", "Z")
    }, filename_fmt

for fname in os.listdir(INPUT_DIR):
    if fname.endswith(".json") and fname != "2025-12-18-10-52-222123123.json":
        with open(fname, "r", encoding="utf-8") as f:
            data = json.load(f)
        if not isinstance(data, dict):
            print(f"Skipping {fname}: not a JSON object")
            continue
        converted, filename_fmt = convert_to_format(data, fname)
        out_path = os.path.join(OUTPUT_DIR, filename_fmt)
        with open(out_path, "w", encoding="utf-8") as out_f:
            json.dump(converted, out_f, indent=2)

print(f"Conversion complete. Files saved in {OUTPUT_DIR}")