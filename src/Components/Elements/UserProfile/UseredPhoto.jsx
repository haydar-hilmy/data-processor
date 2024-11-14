import styled from "styled-components"

const UseredPhoto = (props) => {
    const { initialName = 'A', Username = 'User' } = props

    const PhotoUser = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    background-color: black;
    border-radius: 8px;
    color: white;
    font-size: 1.3rem;
    font-weight: 500;
    `

    return (
        <div className="flex flex-row gap-2 items-center py-2 px-2 cursor-pointer w-full duration-150 hover:bg-primary-dark rounded-md">
            <PhotoUser>{initialName}</PhotoUser>
            <span style={{ letterSpacing: '0.05rem' }} className="text-lg font-bold">{Username}</span>
        </div>
    )
}

export default UseredPhoto