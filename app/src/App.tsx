import React from 'react';
import './App.css';

const App = function() {
  //get data from api;

  let answer: string[] = ['ㅎㅏㄴㄱㅡㄹ'];

  let MAX_LENGTH = 5;
  const [now, setNow] = React.useState(0);
  const [resultData, setResultData] = React.useState(new Array<string>(6).fill('      '));
  const [inputData, setInputData] = React.useState('');

  const onClickSimpleBtn = (character: string) => {
    if (character === "입력") {
      if (inputData.length <= MAX_LENGTH) {
        /* do nothing */
      }
      else {
        console.log('입력');
        let chk = true;
        answer.forEach((c, idx) => {
          if (c !== inputData[idx])
            chk = false;
        });

        if (chk === true) {
          //game win
        }
        else {
          resultData[now] = inputData;
          setResultData(resultData);
          setNow(now+1);
          setInputData('');
        }

        if (now === MAX_LENGTH) {
          //game lose
        }
      }
    }
    else if (character === "삭제") {
      setInputData(inputData.slice(0, -1));
    }
    else {
      if (inputData.length > MAX_LENGTH) {
        console.log("max length warning");
      }
      else {
        setInputData(inputData + character);
      }
    }
  };

  const SimpleBtn = (prop: any) => {
    return (
      <button
        className="kbd flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none bg-slate-200 hover:bg-slate-300 active:bg-slate-400"
        onClick={() => onClickSimpleBtn(prop.character)}>
        {prop.character}
      </button>
    )
  }

  const KeyboardView = () => {
    let kbd: {[key: number]: string[]} = {
      0: ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ'],
      1: ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'],
      2: ['입력','ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ','삭제']
    };

    return (
      <div className="keyboard">
        {
          Object.entries(kbd).map(([idx, chars]) => {
            return(
              <div className="flex justify-center mb-1" key={"kbd" + idx}>
                {
                  chars.map((ch, no) => {
                    return (<SimpleBtn key={"key"+idx+"_"+no} character={ch}/>);
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }

  const ResultView = () => {
    return (
      <div className="result">
        {
          resultData.map((result, no) => {
            let row = [];
            for (let i = 0; i < result.length; i++) {
              row.push(
                <div key={"r"+i}
                className="w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-white border-slate-200">
                  {result[i] === ' ' ? ' ' : result[i]}
                </div>
              );
            }
            return (
              <div key={"result"+no} className="flex justify-center mb-1">
                {row}
              </div>
            )
          })
        }
      </div>
    )
  }

  const HeaderView = () => {
    return (
      <div className="flex justify-center items-center">
        <h1 className="font-bold">글자 맞추기 - 한국어 6자</h1>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
    <HeaderView/>
    <ResultView/>
    <KeyboardView/>
    <div className="flex justify-center">
    {inputData}
    </div>
    </div>
  );
}

export default App;
