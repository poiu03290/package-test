import { useDetectClose } from "@byuckchon-frontend-monorepo/hooks";

type Props = {
  options: string[];
  selectedOption: string;
  onChange: (option: string) => void;
  className?: string;
  Icon?: React.ReactNode;
};

export default function Dropdown({
  options,
  selectedOption,
  onChange,
  className = "",
  Icon,
}: Props) {
  const { ref, isOpen, setIsOpen } = useDetectClose();

  const onClickDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const onChangeOption = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`${className} relative w-full`}>
      <div className="relative" ref={ref} onClick={onClickDropdown}>
        <div className="relative z-20 flex h-[52px] w-full items-center justify-between rounded-xl border border-[#ccc] bg-white">
          <p className="text-input ml-5 py-5 text-[#222]">{selectedOption}</p>
          <img
            src={Icon as string}
            width={20}
            height={20}
            className={`${
              isOpen ? "rotate-180" : ""
            } mr-5 transition-transform duration-300`}
          />
        </div>

        {isOpen && (
          <div className="absolute top-11 left-0 z-10 w-full flex-col rounded-b-xl border-x border-b border-[#ccc] bg-white pt-2">
            {options.map((option) => (
              <button
                key={option}
                className="text-input w-full px-5 py-3 text-start text-[#222]"
                onClick={(e) => {
                  e.stopPropagation();
                  onChangeOption(option);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
