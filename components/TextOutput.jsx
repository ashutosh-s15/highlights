'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Divider,
  Input,
  Slider,
  Tooltip,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { highlightsPayloadAtom } from '@atoms/highlightsPayload';
import { languageOptions } from '@languages';

const TextOutput = ({ text, handleExtract, isExtractingHighlights }) => {
  const [copied, setCopied] = useState('');
  const [length, setLength] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState(new Set(['english']));
  const [highlightsPayload, setHighlightsPayload] = useAtom(
    highlightsPayloadAtom
  );
  const router = useRouter();

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  );

  useEffect(() => {
    const lang = Array.from(selectedKeys).join(', ').replaceAll('_', ' ');
    setHighlightsPayload({
      language: lang,
      tokenLength: Number(length),
      temperature,
    });
  }, [selectedKeys, length, temperature]);

  const handleCopy = () => {
    setCopied(text);
    navigator.clipboard.writeText(text);
    setTimeout(() => setCopied(''), 3000);
  };

  return (
    <div className="text_result">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src="/assets/icons/text.png"
            alt="logo"
            width={40}
            height={40}
            className="object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              Model: whisper-1
            </h3>
            <p className="font-inter text-sm text-gray-500">
              Length: {text.length}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === text
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt="copy"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="h-[16rem] overflow-y-auto my-4 font-satoshi text-sm text-gray-700">
        {text}
      </p>

      <Divider className="my-2" />
      <div className="flex items-center font-satoshi text-sm text-gray-700">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize rounded-lg mr-4">
              Language: {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            sc
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            className="h-[200px] overflow-y-auto"
          >
            {languageOptions.map(option => (
              <DropdownItem key={option}>{option}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Input
          variant="bordered"
          size="md"
          type="number"
          min={100}
          radius="sm"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span>Length:</span>
            </div>
          }
          className="min-w-[8rem] w-fit"
          onValueChange={setLength}
        />
      </div>

      <Slider
        size="sm"
        step={0.1}
        color="foreground"
        label={
          <span className="flex">
            <span className="mr-1">Temperature</span>
            <Tooltip
              content="The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic."
              size="md"
              offset={-7}
              placement="bottom"
              showArrow
              isDismissable
              className="max-w-[16rem] p-3"
            >
              <Image
                src="assets/icons/info.svg"
                alt="info"
                width={16}
                height={16}
              />
            </Tooltip>
          </span>
        }
        showSteps={true}
        maxValue={1}
        minValue={0}
        defaultValue={0}
        className="max-w-md my-3 font-satoshi text-sm text-gray-700"
        onChangeEnd={setTemperature}
      />

      <div className="flex items-center">
        {handleExtract && (
          <button className="cta_btn mr-3" onClick={handleExtract}>
            {isExtractingHighlights ? (
              <span className="flex-center flex-wrap">
                <Image
                  src="assets/icons/button-loader.svg"
                  width={20}
                  height={20}
                  alt="loader"
                  className="object-contain"
                />
                Transcribing...
              </span>
            ) : (
              'Create Highlights'
            )}
          </button>
        )}
        <button className="black_btn" onClick={() => router.push('/')}>
          Upload New Audio
        </button>
      </div>
    </div>
  );
};

export default TextOutput;
