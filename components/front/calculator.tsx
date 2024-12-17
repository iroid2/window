"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Minus, Square, Maximize2, Minimize2 } from "lucide-react";

interface CalculatorProps {
  onClose: () => void;
  isMaximized: boolean;
  onMaximize: () => void;
  onMinimize: () => void;
}

export default function Calculator({
  onClose,
  isMaximized,
  onMaximize,
  onMinimize,
}: CalculatorProps) {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);

    if (memory === null) {
      setMemory(current);
    } else if (operation) {
      const result = calculate(memory, current, operation);
      setMemory(result);
      setDisplay(result.toString());
    }

    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return a / b;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (operation && memory !== null) {
      const current = parseFloat(display);
      const result = calculate(memory, current, operation);
      setDisplay(result.toString());
      setMemory(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setMemory(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  return (
    <div
      className={`fixed ${
        isMaximized ? "inset-0" : "top-4 left-4 w-80"
      } bg-[#202020] text-white rounded-lg shadow-lg flex flex-col overflow-hidden`}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-2 h-9 bg-[#1f1f1f]">
        <div className="flex items-center gap-2">
          <img
            src="/images/calculator.png"
            alt="Calculator"
            className="w-4 h-4"
          />
          <span className="text-sm">Calculator</span>
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-[#333]"
            onClick={onMinimize}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-[#333]"
            onClick={onMaximize}
          >
            {isMaximized ? (
              <Minimize2 className="h-3 w-3" />
            ) : (
              <Maximize2 className="h-3 w-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-[#333] hover:text-red-400"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Display */}
      <div className="p-4">
        <div className="text-right text-4xl font-light mb-4 h-12 overflow-hidden">
          {display}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-1">
          {/* Row 1 */}
          <Button
            variant="ghost"
            className="aspect-square text-lg"
            onClick={() => handleClear()}
          >
            C
          </Button>
          <Button
            variant="ghost"
            className="aspect-square text-lg"
            onClick={() => handleBackspace()}
          >
            ⌫
          </Button>
          <Button
            variant="ghost"
            className="aspect-square text-lg"
            onClick={() => handleOperation("÷")}
          >
            ÷
          </Button>
          <Button
            variant="ghost"
            className="aspect-square text-lg"
            onClick={() => handleOperation("×")}
          >
            ×
          </Button>

          {/* Row 2 */}
          <Button
            variant="ghost"
            className="aspect-square text-lg"
            onClick={() => handleNumber("7")}
          >
            7
          </Button>
          <Button
            variant="ghost"
            className="aspect-square text-lg"
            onClick={() => handleNumber("8")}
          >
            8
          </Button>
          <Button
            variant="ghost"
            className="aspect-square text-lg"
            onClick={() => handleNumber("9")}
          >
            9
          </Button>
          <Button
            variant="ghost"
            className="aspect-square text-lg"
            onClick={() => handleOperation("-")}
          >
            -
          </Button>

          {/* Row 3 */}
          <Button
            variant="ghost"
            className="aspect-square text-lg"
            onClick={() => handleNumber("4")}
          >
            4
          </Button>
          <Button
            variant="ghost"
            className="aspect-square text-lg"
            onClick={() => handleNumber("5")}
          >
            5
          </Button>
          <Button
            variant="ghost"
            className="aspect-square text-lg"
            onClick={() => handleNumber("6")}
          >
            6
          </Button>
          <Button
            variant="ghost"
            className="aspect-square text-lg"
            onClick={() => handleOperation("+")}
          >
            +
          </Button>

          {/* Row 4 */}
          <Button
            variant="ghost"
            className="aspect-square text-lg"
            onClick={() => handleNumber("1")}
          >
            1
          </Button>
          <Button
            variant="ghost"
            className="aspect-square text-lg"
            onClick={() => handleNumber("2")}
          >
            2
          </Button>
          <Button
            variant="ghost"
            className="aspect-square text-lg"
            onClick={() => handleNumber("3")}
          >
            3
          </Button>
          <Button
            variant="ghost"
            className="aspect-square text-lg row-span-2"
            onClick={() => handleEquals()}
          >
            =
          </Button>

          {/* Row 5 */}
          <Button
            variant="ghost"
            className="aspect-square text-lg col-span-2"
            onClick={() => handleNumber("0")}
          >
            0
          </Button>
          <Button
            variant="ghost"
            className="aspect-square text-lg"
            onClick={() => handleDecimal()}
          >
            .
          </Button>
        </div>
      </div>
    </div>
  );
}
