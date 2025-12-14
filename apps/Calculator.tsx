import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface CalculatorAppProps {
    lang: Language;
}

export const CalculatorApp: React.FC<CalculatorAppProps> = ({ lang }) => {
    const t = translations[lang];
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');
    const [isNewNumber, setIsNewNumber] = useState(true);

    const handleNumber = (num: string) => {
        if (isNewNumber) {
            setDisplay(num);
            setIsNewNumber(false);
        } else {
            setDisplay(display === '0' ? num : display + num);
        }
    };

    const handleOperator = (op: string) => {
        setEquation(display + ' ' + op + ' ');
        setIsNewNumber(true);
    };

    const handleEqual = () => {
        try {
            // Note: In a production app, avoid eval() and write a proper parser. 
            // For this portfolio demo, we are careful with input control.
            // Replace visual operators with JS operators
            const evalString = (equation + display)
                .replace('×', '*')
                .replace('÷', '/');
            
            const result = eval(evalString);
            setDisplay(String(result));
            setEquation('');
            setIsNewNumber(true);
        } catch (e) {
            setDisplay(t.calcError);
            setIsNewNumber(true);
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setEquation('');
        setIsNewNumber(true);
    };

    const buttons = [
        { label: 'C', type: 'func', action: handleClear, span: 2 },
        { label: '%', type: 'func', action: () => handleOperator('%') },
        { label: '÷', type: 'op', action: () => handleOperator('/') },
        { label: '7', type: 'num', action: () => handleNumber('7') },
        { label: '8', type: 'num', action: () => handleNumber('8') },
        { label: '9', type: 'num', action: () => handleNumber('9') },
        { label: '×', type: 'op', action: () => handleOperator('*') },
        { label: '4', type: 'num', action: () => handleNumber('4') },
        { label: '5', type: 'num', action: () => handleNumber('5') },
        { label: '6', type: 'num', action: () => handleNumber('6') },
        { label: '-', type: 'op', action: () => handleOperator('-') },
        { label: '1', type: 'num', action: () => handleNumber('1') },
        { label: '2', type: 'num', action: () => handleNumber('2') },
        { label: '3', type: 'num', action: () => handleNumber('3') },
        { label: '+', type: 'op', action: () => handleOperator('+') },
        { label: '0', type: 'num', action: () => handleNumber('0'), span: 2 },
        { label: '.', type: 'num', action: () => handleNumber('.') },
        { label: '=', type: 'eq', action: handleEqual },
    ];

    return (
        <div className="flex flex-col h-full bg-[#f3f3f3] dark:bg-[#202020]" dir="ltr">
            <div className="p-4 bg-[#f3f3f3] dark:bg-[#202020] text-right">
                <div className="text-sm text-gray-500 h-6">{equation}</div>
                <div className="text-4xl font-light text-gray-800 dark:text-white truncate">{display}</div>
            </div>
            <div className="flex-1 grid grid-cols-4 gap-[1px] bg-gray-200 dark:bg-gray-700 p-[1px]">
                {buttons.map((btn, idx) => (
                    <button
                        key={idx}
                        onClick={btn.action}
                        className={`
                            ${btn.span === 2 ? 'col-span-2' : ''}
                            ${btn.type === 'op' || btn.type === 'eq' ? 'bg-[#E95420] text-white hover:bg-[#d14415]' : 'bg-white dark:bg-[#333] text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#404040]'}
                            text-xl font-normal transition-colors active:opacity-80
                        `}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    );
};