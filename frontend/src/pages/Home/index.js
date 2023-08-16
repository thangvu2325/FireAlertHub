import styles from './Home.module.scss';
import classNames from 'classnames/bind';
// import 'semantic-ui-css/semantic.min.css';
import React, { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
function Home() {
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });

            await fetch(
                `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`,
            )
                .then((res) => res.json())
                .then((result) => {
                    setData(result);
                    console.log(result);
                });
        };
        fetchData();
    }, [lat, long]);
    return (
        <div className={cx('wrap')}>
            <div className={cx('cardContainer')}>
                <div className={cx('card')}>
                    <p className={cx('city')}>{data.sys?.country}</p>
                    <p className={cx('weather')}>
                        {data?.weather?.length && data?.weather[0].description.toUpperCase()}
                    </p>
                    <svg
                        xmlSpace="preserve"
                        viewBox="0 0 100 100"
                        height="50px"
                        width="50px"
                        y="0px"
                        x="0px"
                        id="Layer_1"
                        version="1.1"
                        className={cx('weather')}
                    >
                        <image
                            href={
                                data.data
                                    ? `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`
                                    : 'http://openweathermap.org/img/wn/10d@2x.png'
                            }
                            y={0}
                            x={0}
                            height={100}
                            width={100}
                            id="image0"
                        />
                    </svg>
                    <p className={cx('temp')}>{data.main?.temp}°</p>
                    <div className={cx('minmaxContainer')}>
                        <div className={cx('min')}>
                            <p className={cx('minHeading')}>Min</p>
                            <p className={cx('minTemp')}>{data.main?.temp_min}°</p>
                        </div>
                        <div className={cx('max')}>
                            <p className={cx('maxHeading')}>Max</p>
                            <p className={cx('maxTemp')}>{data.main?.temp_max}°</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
