import React from 'react';

const RightClickComponent = () => {
  const handleRightClick = (event) => {
    event.preventDefault(); // Mencegah menu konteks default muncul
    alert('Klik kanan terdeteksi!'); // Ganti dengan aksi yang diinginkan
  };

  return (
    <div
      onContextMenu={handleRightClick}
      style={{
        width: '300px',
        height: '200px',
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Klik kanan di sini
    </div>
  );
};

export default RightClickComponent;