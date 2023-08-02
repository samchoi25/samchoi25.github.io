import { useState, useEffect } from 'react';
import classnames from 'classnames';
import './sprite.scss';

const Sprite = () => {
    const [isMoving, setIsMoving] = useState(true);
    const [direction, setDirection] = useState({
        x: 0,
        y: 0,
        z: 0
    });
    const handleKeyDown = (event) => {
        console.log(event)
        setIsMoving(true)
        if (event.key === 'ArrowLeft' || event.key === 'a') {
            setDirection({...direction, x: -1});
        } else if (event.key === 'ArrowRight' || event.key === 'd') {
            setDirection({...direction, x: 1});
        } else if (event.key === 'ArrowUp' || event.key === 'w') {
            setDirection({...direction, y: 1});
        } else if (event.key === 'ArrowDown' || event.key === 's') {
            setDirection({...direction, y: -1});
        } else if (event.key === ' ') {
            setDirection({...direction, z: 1});
        }

    };


    const handleKeyUp = (event) => {
        setIsMoving(false)
    };

    useEffect(() => {
        // Attach the event listener when the component mounts
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <span className={classnames(
            "sprite",
            {
                "sprite-moving": isMoving,
                "sprite-left": direction.x === -1,
                "sprite-up": direction.y === 1,
                "sprite-down": direction.y === -1,
                "sprite-jump": direction.z === 1
            }
        )} />
    );
}

export default Sprite;