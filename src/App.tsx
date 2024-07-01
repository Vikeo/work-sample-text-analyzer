import { Button, Container, Typography } from '@mui/material';
import './App.css';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useRef, useState } from 'react';
import { analyzeText } from './analysis';

const App = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!resultRef.current) {
      return;
    }
    setLoading(true)
    resultRef.current.innerHTML = 'Loading ...'	
    
    const response = await analyzeText(textAreaRef.current?.value || '');
    const resultString = `Your text consists of ${response.numWords} words (${response.numLetters} letters)`

    setLoading(false)
    resultRef.current.innerHTML = resultString
  }

  return (
    <div className="App">
      <Typography color='white' fontSize={24} marginTop={4}>Text Analyzer</Typography>
      <form onSubmit={(e) => {
        handleSubmit();
        e.preventDefault();
      }}>
          <Container sx={{display: 'flex', flexDirection: 'column', gap:2, mx: 'auto', marginTop:4}}>
            <TextareaAutosize ref={textAreaRef} minRows={3} placeholder="Enter text to be counted" />
            <Button type='submit' variant='contained' disabled={loading}>Submit</Button>
          </Container>
          <Typography color='white' marginTop={2} ref={resultRef}/>
      </form>

    </div>
  );
}

export default App;
