import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import reloadImage from '../assets/replay-svgrepo-com.png'

export default function Home() {

    let paragraph = ['it', 'was', 'a', 'sunny', 'day', 'in', 'the', 'park', 'with', 'children', 'playing', 'and', 'birds', 'chirping', 'the', 'air', 'was', 'filled', 'with', 'laughter', 'and', 'the', 'scent', 'of', 'fresh', 'flowers', 'wafted', 'through', 'the', 'breeze', 'families', 'gathered', 'for', 'picnics', 'and', 'friends', 'met', 'for', 'leisurely', 'stroll', 'it', 'was', 'the', 'perfect', 'day', 'to', 'relax', 'and', 'enjoy', 'the', 'beauty', 'of', 'nature', 'so', 'we', 'take', 'the', 'rest', 'that', 'beautiful', 'day.']

    const [text, setText] = useState('')
    const [time, setTime] = useState(60)
    const [num, setNum] = useState(0)
    const [correctWords, setCorrectWords] = useState(0)
    const [wrongWords, setWrongWords] = useState(0)
    const intervalIdRef = useRef(null);
    const inputRef = useRef(null)

    const timeFunc = () => {
        intervalIdRef.current = setInterval(() => {
            setTime((prev) => {
                if (prev - 1 <= 0) {
                    clearInterval(intervalIdRef.current)
                }
                if (prev - 1 === 0) inputRef.current.disabled = true
                return prev - 1
            })
        }, 1000);
    }

    const handleChange = (e) => {
        const value = e.target.value.trim();
        setText(value)

        // Start the timer if the text is being entered for the first time
        if (value.length === '' && num === 0) {
            console.log('please enter the character!')
            timeFunc();
            return
        }
        if (value.length === 1 && num === 0) {
            console.log('Timer started');
            timeFunc();
        }
    }

    const handleKeyDown = (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            if (num >= paragraph.length) {
                inputRef.current.disabled = true
            } else {
                if (text === '') return
                setNum(num + 1)
                setText('')
                handleUnderline(num + 1)
                if (text.trim() === paragraph[num]) {
                    console.log('space hit, and word is correct!')
                    const element = document.getElementById(`${num}`)
                    element.classList.add('text-green-500')
                    setCorrectWords(correctWords + 1)
                } else {
                    console.log('space hit, and word is Incorrect!')
                    const element = document.getElementById(`${num}`)
                    element.classList.add('text-red-600')
                    setWrongWords(wrongWords + 1)
                }
            }
        }
    }

    const handleUnderline = (num) => {
        if (num < paragraph.length) {
            const element = document.getElementById(`${num}`)
            element.classList.add('text-white')
        }
    }

    console.log(correctWords, wrongWords)
    useEffect(() => {
        handleUnderline(num)
        return () => {
            clearInterval(intervalIdRef.current)
        }
    }, [])

    return (
        <>
            <div style={{ backgroundColor: 'rgb(17, 17, 17)' }} className='select-none h-screen'>
                <Navbar />
                <div className="container mx-auto px-64 h-max flex items-center mt-40" >

                    <div className='justify-center'>

                        <div className='p-5 text-3xl font-bold text-justify bg-zinc-900 text-zinc-400  rounded'>
                            <p className=''>
                                {
                                    paragraph.map((item, index) => {
                                        return <><span key={index} id={index} className=''> {item}</span>&#160;</>
                                    })
                                }
                            </p>
                        </div>

                        <div className='flex mt-12 h-14  text-white'>

                            <input
                                type="text"
                                className='w-full text-xl p-2  bg-zinc-800 rounded focus:outline-none'
                                value={text}
                                onKeyDown={handleKeyDown}
                                onChange={handleChange}
                                ref={inputRef}
                                disabled={false}
                            />
                            <button className='text-xl ms-3 w-40 px-4   bg-zinc-900 rounded'>{correctWords / 1} wpm</button>
                            <button className='text-xl ms-3 px-8   bg-zinc-900 rounded'>{time || '0'}</button>
                            <div className='flex justify-center items-center bg-zinc-900 ms-3'>
                                <img
                                    src={reloadImage}
                                    alt=""
                                    className='px-3  rounded w-20 h-10'
                                    onClick={() => { window.location.reload() }}
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
