interface ChromeProps {
  onClose: () => void;
  isMaximized: boolean;
  onMaximize: () => void;
  onMinimize: () => void;
}

export default function Chrome({
  onClose,
  isMaximized,
  onMaximize,
  onMinimize,
}: ChromeProps) {
  return (
    <div
      className={`fixed ${
        isMaximized ? "inset-0" : "top-4 left-4 w-3/4 h-3/4"
      } bg-white rounded-lg shadow-lg p-4`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Google Chrome</h2>
        <div className="flex gap-2">
          <button
            onClick={onMinimize}
            className="text-gray-500 hover:text-gray-700"
          >
            Minimize
          </button>
          <button
            onClick={onMaximize}
            className="text-gray-500 hover:text-gray-700"
          >
            {isMaximized ? "Restore" : "Maximize"}
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      </div>
      <div className="text-gray-700">Chrome browser content goes here</div>
    </div>
  );
}
