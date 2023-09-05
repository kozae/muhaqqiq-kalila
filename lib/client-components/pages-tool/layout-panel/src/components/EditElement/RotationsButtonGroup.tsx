interface IRotationsButtonGroupProps {
  rotation: number;
  setRotation: (value: number) => void;
}

export function RotationsButtonGroup({
  rotation,
  setRotation,
}: IRotationsButtonGroupProps) {
  const rotations = Array.from({ length: 4 }, (_, index) => index * 90);

  const handleAdd = () => {
    let newRotation = rotation + 30;
    if (newRotation > 359) newRotation = 359;
    setRotation(newRotation);
  };

  const handleSubtract = () => {
    let newRotation = rotation - 30;
    if (newRotation < 0) newRotation = 0;
    setRotation(newRotation);
  };

  return (
    <div className="isolate inline-flex rounded-md shadow-sm">
      {/* Subtract Button */}
      <button
        type="button"
        className="relative -ml-px inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        onClick={handleSubtract}
      >
        -30°
      </button>

      {/* Rotation Buttons */}
      {rotations.map((rot) => (
        <button
          key={rot}
          type="button"
          className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          onClick={() => setRotation(rot)}
          aria-pressed={rotation === rot}
        >
          {rot}°
        </button>
      ))}

      {/* Add Button */}
      <button
        type="button"
        className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        onClick={handleAdd}
      >
        +30°
      </button>
    </div>
  );
}
