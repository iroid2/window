interface VSCodeProps {
  onClose: () => void;
  isMaximized: boolean;
  onMaximize: () => void;
  onMinimize: () => void;
}

export default function VSCode({
  onClose,
  isMaximized,
  onMaximize,
  onMinimize,
}: VSCodeProps) {
  return (
    <div
      className={`fixed ${
        isMaximized ? "inset-0" : "top-4 left-4 w-3/4 h-3/4"
      } bg-gray-900 text-white rounded-lg shadow-lg p-4`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Visual Studio Code</h2>
        <div className="flex gap-2">
          <button
            onClick={onMinimize}
            className="text-gray-300 hover:text-white"
          >
            Minimize
          </button>
          <button
            onClick={onMaximize}
            className="text-gray-300 hover:text-white"
          >
            {isMaximized ? "Restore" : "Maximize"}
          </button>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            Close
          </button>
        </div>
      </div>
      <div>VS Code content goes here</div>
    </div>
  );
}
