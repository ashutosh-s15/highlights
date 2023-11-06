import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Document, Paragraph, Packer, TextRun } from 'docx';
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
  Divider,
} from '@nextui-org/react';

const exportFormats = ['txt', 'docx'];

const SavedHighlight = ({ userId, keyPoints }) => {
  const [copied, setCopied] = useState('');
  const [selectedKeys, setSelectedKeys] = useState(new Set(['txt']));
  const selectedFormat = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  );

  const handleCopy = () => {
    const highlights = keyPoints.join('\n');
    setCopied(highlights);
    navigator.clipboard.writeText(highlights);
    setTimeout(() => setCopied(''), 3000);
  };

  const exportTextData = (textData, format) => {
    if (format === 'docx') {
      // initializing document for highlights
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [new TextRun(textData)],
              }),
            ],
          },
        ],
      });
      Packer.toBlob(doc).then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'highlights.docx';
        link.href = url;
        link.click();
      });
      return;
    }

    const fileData = new Blob([textData], { type: 'text/plain' });
    const url = URL.createObjectURL(fileData);
    const link = document.createElement('a');
    link.download = 'highlights.txt';
    link.href = url;
    link.click();
  };

  const handleHighlightExport = () => {
    const highlights = keyPoints.join('\n');
    if (highlights) exportTextData(highlights, selectedFormat);
  };

  return (
    <div className="highlights_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src="/assets/icons/star.png"
            alt="logo"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              Model: gpt-3.5-turbo-instruct
            </h3>
            <p className="font-inter text-sm text-gray-500">
              Length: {keyPoints ? keyPoints.join('\n')?.length : '0'}
            </p>
          </div>
        </div>

        {keyPoints && keyPoints?.length > 0 && (
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied === keyPoints.join('\n')
                  ? '/assets/icons/tick.svg'
                  : '/assets/icons/copy.svg'
              }
              alt="copy"
              width={12}
              height={12}
            />
          </div>
        )}
      </div>

      {keyPoints && keyPoints?.length > 0 ? (
        <ul className="h-[22rem] overflow-y-auto my-4 font-satoshi text-sm text-gray-700">
          {keyPoints.map((str, index) => (
            <li key={index}>{str}</li>
          ))}
        </ul>
      ) : (
        <p className="h-[22rem] overflow-y-auto my-4 font-satoshi text-sm text-gray-700">
          Key Notes...
        </p>
      )}

      <Divider className="my-4" />
      <div className="flex items-center font-satoshi text-sm text-gray-700">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize rounded-lg mr-3">
              Format: {selectedFormat}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            className="overflow-y-auto"
          >
            {exportFormats.map(option => (
              <DropdownItem key={option}>{option}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <button className="black_btn mr-4" onClick={handleHighlightExport}>
          Export{' '}
          {
            <Image
              src="assets/icons/export.svg"
              alt="export"
              width={20}
              height={20}
              className="ml-2"
            />
          }
        </button>
      </div>
    </div>
  );
};

export default SavedHighlight;
