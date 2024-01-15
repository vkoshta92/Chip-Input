// ChipInput.tsx

import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import './ChipInput.css';

interface Chip {
  id: number;
  label: string;
}

interface Suggestion {
  id: number;
  name: string;
  imageUrl: string;
}

const ChipInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [chips, setChips] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<Suggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

//   https://randomuser.me/photos
// random images yha se  use ki hai.
  const suggestions: Suggestion[] = [
    { id: 1, name: 'Ravi Kumar', imageUrl: 'https://randomuser.me/api/portraits/men/31.jpg' },
    { id: 2, name: 'Priya Sharma', imageUrl: 'https://randomuser.me/api/portraits/women/72.jpg' },
    { id: 3, name: 'Amit Patel', imageUrl: 'https://randomuser.me/api/portraits/men/29.jpg' },
    { id: 4, name: 'Sneha Kapoor', imageUrl: 'https://randomuser.me/api/portraits/women/40.jpg' },
    { id: 5, name: 'Rahul Gupta', imageUrl: 'https://randomuser.me/api/portraits/men/28.jpg' },
    { id: 6, name: 'Anita Singh', imageUrl: 'https://randomuser.me/api/portraits/women/8.jpg' },
    { id: 7, name: 'Aryan Sharma', imageUrl: 'https://randomuser.me/api/portraits/men/51.jpg' },
    { id: 8, name: 'Neha Verma', imageUrl: 'https://randomuser.me/api/portraits/women/33.jpg' },
    { id: 9, name: 'Suresh Yadav', imageUrl: 'https://randomuser.me/api/portraits/men/92.jpg' },
    { id: 10, name: 'Ritu Mishra', imageUrl: 'https://randomuser.me/api/portraits/women/21.jpg' },
    { id: 11, name: 'Karthik Reddy', imageUrl: 'https://randomuser.me/api/portraits/men/84.jpg' },
    { id: 12, name: 'Anjali Singh', imageUrl: 'https://randomuser.me/api/portraits/women/33.jpg' },
    { id: 13, name: 'Vikram Joshi', imageUrl: 'https://randomuser.me/api/portraits/men/85.jpg' },
    { id: 14, name: 'Pooja Sharma', imageUrl: 'https://randomuser.me/api/portraits/women/17.jpg' },
    { id: 15, name: 'Rajendra Kumar', imageUrl: 'https://randomuser.me/api/portraits/men/81.jpg' },
    { id: 16, name: 'Meera Kapoor', imageUrl: 'https://randomuser.me/api/portraits/women/83.jpg' },
    { id: 17, name: 'Aditya Singh', imageUrl: 'https://randomuser.me/api/portraits/men/76.jpg' },
    { id: 18, name: 'Shweta Yadav', imageUrl: 'https://randomuser.me/api/portraits/women/15.jpg' },
    { id: 19, name: 'Prakash Sharma', imageUrl: 'https://randomuser.me/api/portraits/men/11.jpg' },
    { id: 20, name: 'Aishwarya Patel', imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
  ];

  const filterItems = (value: string) => {
    setFilteredItems(
      suggestions.filter((suggestion) => suggestion.name.toLowerCase().includes(value.toLowerCase()))
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    filterItems(e.target.value);
  };

  const handleItemClick = (suggestion: Suggestion) => {
    setInputValue('');
    setChips([...chips, { id: Date.now(), label: suggestion.name }]);
    setFilteredItems(filteredItems.filter((filteredItem) => filteredItem.id !== suggestion.id));
  };

  const handleChipRemove = (chipId: number) => {
    const removedChip = chips.find((chip) => chip.id === chipId);
    if (removedChip) {
      setChips(chips.filter((chip) => chip.id !== chipId));
      setFilteredItems([...filteredItems, { id: removedChip.id, name: removedChip.label, imageUrl: '' }]);
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && inputValue === '') {
      const lastChip = chips[chips.length - 1];
      if (lastChip) {
        handleChipRemove(lastChip.id);
      }
    }
  };

  const renderChipsWithImages = () => {
    return chips.map((chip) => (
      <div key={chip.id} className="chip-with-image">
        <img src={suggestions.find((suggestion) => suggestion.name === chip.label)?.imageUrl} alt={chip.label} className="chip-icon" />
        {chip.label}
        <span onClick={() => handleChipRemove(chip.id)} className="chip-remove">
          X
        </span>
      </div>
    ));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chips]);

  return (
    <div className="chip-input">
      <div className="chips-container">
        {renderChipsWithImages()}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Type to search..."
        />
      </div>
      {inputValue && (
        <div className="suggestion-list">
          {filteredItems.map((suggestion) => (
            <div key={suggestion.id} className="suggestion-item" onClick={() => handleItemClick(suggestion)}>
              <img src={suggestion.imageUrl} alt={suggestion.name} className="suggestion-item-image" />
              <span className="suggestion-item-name">{suggestion.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChipInput;
