import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes untuk pergerakan warna dari kiri ke kanan
const slide = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

// Keyframes untuk perubahan warna
const changeColor = keyframes`
  0% {
    background-color: #e5e7eb; // Warna pertama
  }
  50% {
    background-color: #f2f2f2; // Warna kedua
  }
  100% {
    background-color: #e5e7eb; // Kembali ke warna pertama
  }
`;

const LoadingWrapper = styled.div`
  background: linear-gradient(90deg, #e5e7eb 25%, #f2f2f2 50%, #e5e7eb 75%);
  background-size: 200% 100%; // Ukuran latar belakang lebih besar untuk pergerakan
  animation: ${slide} 0.8s linear infinite, ${changeColor} 1s ease-in-out infinite;
`;

const RowTableLoading = () => {
    return (
        <>
            <div style={{ flex: 0.5 }}>
                <LoadingWrapper className='h-8 w-full rounded-md' />
            </div>
            <div style={{ flex: 2 }}>
                <LoadingWrapper className='h-8 w-full rounded-md' />
            </div>
            <div style={{ flex: 4 }}>
                <LoadingWrapper className='h-8 w-full rounded-md' />
            </div>
            <div style={{ flex: 3 }}>
                <LoadingWrapper className='h-8 w-full rounded-md' />
            </div>
        </>
    )
}

export default RowTableLoading

