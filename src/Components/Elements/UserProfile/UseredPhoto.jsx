import styled from "styled-components"
import { getInitial } from '../../../Function/GetInitial'

const UseredPhoto = (props) => {
    const { username = 'User', email = "", userphoto = null } = props



    const PhotoUser = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    max-width: 45px;
    max-height: 45px;
    min-width: 45px;
    min-height: 45px;
    background-color: black;
    border-radius: 8px;
    color: white;
    font-size: 1.3rem;
    font-weight: 500;
    `

    return (
        <div className="flex flex-row gap-2 items-center py-2 px-2 cursor-pointer w-full duration-150 hover:bg-primary-dark rounded-md">
            <PhotoUser>{getInitial(username, true)}</PhotoUser>
            <div className="flex flex-col gap-0">
                <span style={{ letterSpacing: '0.05rem', wordBreak: 'break-all' }} className="text-lg font-bold">{username}</span>
                <span style={{ wordBreak: 'break-all' }} className="text-xs font-light">{email}</span>
            </div>
        </div>
    )
}

export default UseredPhoto