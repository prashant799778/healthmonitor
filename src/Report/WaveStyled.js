import styled from 'styled-components'
export const WaveStyled = styled.div`
#c {
    background: 
        -webkit-linear-gradient(left, black 0%, white 100%),
        -webkit-linear-gradient(left, black 0%, red   100%),
        -webkit-linear-gradient(left, black 0%, lime  100%),
        -webkit-linear-gradient(left, black 0%, #07f  100%);
    background-size:
        100% 25%;
    background-position-x: 0;
    background-position-y:
        0,
        33%,
        66%,
        100%;
    background-repeat: repeat-x;
    -webkit-animation-name: linemove;
    -webkit-animation-duration: 5s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
}

@keyframes  linemove {
    from {
        background-position-x: 0;
    }
    to {
        background-position-x:
            500px,
            500px,
            500px,
            500px;
    }
}

`;