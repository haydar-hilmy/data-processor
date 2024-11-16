import styled from "styled-components"
import { getInitial } from '../../../Function/GetInitial'

const CirclePhoto = (props) => {
    const { username = 'User', userphoto = null } = props

    const PhotoUser = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    background-color: black;
    border-radius: 9999px;
    color: white;
    font-size: 2rem;
    font-weight: 500;
    background-image: url(${userphoto != null ? userphoto : ""});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    `

    return (
        <PhotoUser>{userphoto != null ? "" : getInitial(username, true)}</PhotoUser>
    )
}

export default CirclePhoto