import React, { useState } from 'react';
import styled from 'styled-components';

interface ImageUploaderProps {
    imageUrl: string;
}

const Image: React.FC<ImageUploaderProps> = ({ imageUrl }) => {
    const [isValid, setIsValid] = useState(true);

    const handleError = () => {
        setIsValid(false);
    };

    return (
        <ImageContainer>
            {isValid && imageUrl ? (
                <StyledImage
                    src={imageUrl}
                    alt="업로드된 이미지"
                    onError={handleError}
                />
            ) : (
                <Placeholder>
                    이미지가 유효하지 않거나 불러올 수 없습니다
                </Placeholder>
            )}
        </ImageContainer>
    );
};

export default Image;

const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const Placeholder = styled.div`
    width: 100%;
    height: 100%;
    background-color: #D9D9D9;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
`;
