import styles from './App.module.css'
import { useEffect, useState } from 'react';

import { Button } from './components/Button';
import { Header } from "./components/Header";
import { Hint } from "./components/Hint";
import { Input } from './components/Input/Input';
import { Letter } from "./components/Letter/Letter";
import { LettersUsed, LettersUsedProps } from './components/LettersUsed/LettersUsed';
import { WORDS, Challenge } from "../utils/words"



export default function App() {
  const [score, setScore] = useState(0)

  const [letter, setLetter] = useState('')
  const [lettersUsed, setLetterUsed] = useState<LettersUsedProps[]>([])
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const ATTEMPT_MARGIN = 5

    function handleRestartGame() {
      const isConfirmed = window.confirm("Você tem certeza que deseja reiniciar?")
      if (isConfirmed ) {
        startGame()
      }
    }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index]

    console.log(randomWord);

    setChallenge(randomWord)

    setScore(0)
    setLetter('')
    setLetterUsed([])
  }
  function handleConfirm() {
    if (!challenge) {
      return
    }
    if (!letter.trim()) {
      return alert('digite uma letra!')
    }
    const value = letter.toUpperCase()
    const exists = lettersUsed.find((used) => used.value.toUpperCase() === value)

    if (exists) {
      setLetter('')
      return alert('Letra ja utilizada: ' + value)
    }

    const hits = challenge.word.toUpperCase().split('').filter((char) => char === value).length

    const correct = hits > 0
    const currentScore = score + hits

    setLetterUsed((prevState) => [...prevState, { value, correct }])
    setScore(currentScore)
    setLetter('')

  }
  function endGame(message: string){
    alert(message)
    startGame()
  }

  useEffect(() => {
    startGame()
  }, [])
  useEffect(() => {
    if (!challenge) {
     return
    }
    setTimeout(() => {
      if(score === challenge.word.length){
        return endGame('Parabéns, você descobriu a palavra!') 
      }
      const attemptLimit = challenge.word.length + ATTEMPT_MARGIN

      if(lettersUsed.length === attemptLimit){
        return endGame('Você usou todas as tentativas')
      }
    }, 200);
  }
    ,[score, lettersUsed.length ])

  if (!challenge) {
    return
  }
  return (
    <div className={styles.container}>
      <main>

        <Header current={lettersUsed.length} max={challenge?.word.length + ATTEMPT_MARGIN} onRestart={handleRestartGame} />
        <Hint hint={challenge.tip}></Hint>

        <div className={styles.phrase}>
          {challenge.word.split('').map((letter, index) => {
            const letterUsed = lettersUsed.find((used) => used.value.toUpperCase() === letter.toUpperCase())


            return (
              <Letter key={index} value={letterUsed?.value} color={letterUsed?.correct ? 'correct' : 'default'} />)
          })}

        </div >

        <h4>Palpite</h4>
        <div className={styles.guess}>
          <Input autoFocus
            maxLength={1}
            placeholder='?'
            value={letter}
            onChange={(e) => setLetter(e.target.value)}></Input>
          <Button title='Confirmar' onClick={handleConfirm}></Button>
        </div>

        <LettersUsed data={lettersUsed} />
      </main >
    </div>

  )
}