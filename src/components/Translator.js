import React, { useEffect, useState } from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import './Translator.css'

const Translator = () => {
    const [to, setTo] = useState('tr');
    const [from, setFrom] = useState('en');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isClicked, setIsClicked] = useState(false)

    const obj = JSON.stringify({
        q: input,
        source: from,
        target: to,
        format: "text"
    })

    const handleSelect = (event) => {
        if(event.target.value === 'tr'){
            setFrom(event.target.value);
            setTo('en')
        }
        else{
            setFrom(event.target.value);
            setTo('tr')
        }
      };

    useEffect(() => {
        async function fetchData() {
          const response = await analayze();
          setOutput(response)
        }
        fetchData();
      },[isClicked]);

  const analayze = async () =>{
    const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        body: obj,
        headers: { "Content-Type": "application/json" }
    });
    
    const data = await res.json()
    console.log(data.translatedText)
    return data.translatedText
  }
 
  return (
    <div className='container'>
        <div className='selector'>
            <FormControl fullWidth>
            <InputLabel>Language</InputLabel>
            <Select
                value={from}
                label="Language"
                onChange={handleSelect}
                >
                <MenuItem value={'tr'}>Turkish</MenuItem>
                <MenuItem value={'en'}>English</MenuItem>
            </Select>
            </FormControl>
        </div>
        <div className='translator'>
            <div>
                <div>
                    {from.toUpperCase()}
                </div>
                <TextareaAutosize className='textarea'
                    onInput={(e)=>setInput(e.target.value)} 
                    aria-label="minimum height" 
                    minRows={3} 
                    maxRows={6} 
                    style={{ width: 200 }}
                />
            </div>
            <IconButton onClick={()=>setIsClicked(!isClicked)}>
                <ArrowRightAltIcon sx={{ fontSize: 80 }} color="primary" />
            </IconButton> 
            <div>
                <div>
                {to.toUpperCase()}
                </div>
                <TextareaAutosize
                    onInput={(e)=>setInput(e.target.value)} 
                    aria-label="minimum height" 
                    minRows={3} 
                    maxRows={6}
                    value={output} 
                    style={{ width: 200 }}
                />
            </div>
           
            {/* <TextField onInput={(e)=>setInput(e.target.value)} label={from} variant="outlined" /> */}
            {/* <TextField value={output} label={to} variant="outlined" /> */}
        </div>
        <Button onClick={()=>setIsClicked(!isClicked)} variant="contained">Translate</Button>
    </div>
  )
}

export default Translator