#!/usr/bin/env python3
import sys

try:
    from pypdf import PdfReader
    reader = PdfReader('THE-GROUND-REMAINS.pdf')
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n\n"
    print(text)
except ImportError:
    try:
        import PyPDF2
        with open('THE-GROUND-REMAINS.pdf', 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n\n"
            print(text)
    except ImportError:
        print("ERROR: No PDF library available. Please install pypdf or PyPDF2", file=sys.stderr)
        sys.exit(1)
