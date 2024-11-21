import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    increment,
    decrement,
    incrementByAmount,
    decrementByAmount,
    reset,
} from '../store/counterSlice.js';
import { fetchApiData } from "../store/apiSlice.js";

const Counter = () => {
    const count = useSelector((state) => state.counter.value);
    const apiData = useSelector((state) => state.api.data);
    const apiStatus = useSelector((state) => state.api.status);
    const dispatch = useDispatch();

    useEffect(() => {
        if (apiStatus === 'idle') {
            dispatch(fetchApiData());
        }
    }, [apiStatus, dispatch]);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Redux Toolkit Counter</h1>
            <div>
                <h2>Счетчик: {count}</h2>
                <button onClick={() => dispatch(increment())}>+1</button>
                <button onClick={() => dispatch(decrement())}>-1</button>
                <button onClick={() => dispatch(incrementByAmount(10))}>+10</button>
                <button onClick={() => dispatch(decrementByAmount(10))}>-10</button>
                <button onClick={() => dispatch(reset())} style={{ marginLeft: '10px' }}>
                    Сброс
                </button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h3>Данные из API:</h3>
                {apiStatus === 'loading' && <p>Загрузка данных...</p>}
                {apiStatus === 'succeeded' && (
                    <div>
                        <p><strong>Заголовок:</strong> {apiData.title}</p>
                        <p><strong>Текст:</strong> {apiData.body}</p>
                    </div>
                )}
                {apiStatus === 'failed' && <p>Ошибка загрузки данных.</p>}
            </div>
        </div>
    );
};

export default Counter;
