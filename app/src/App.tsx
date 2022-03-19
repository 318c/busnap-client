import React from 'react';

const App = function() {
  //get data from api;

  let answer: string[] = ['ㅎㅏㄴㄱㅡㄹ'];

  let MAX_LENGTH = 5;
  const [now, setNow] = React.useState(0);
  const [resultData, setResultData] = React.useState(new Array<string>(6).fill('      '));
  const [inputData, setInputData] = React.useState('');

  const onClickSimpleBtn = (character: string) => {
    if (character === "입력") {
      if (inputData.length <= MAX_LENGTH+1) {
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
        resultData[now] = inputData;
      }
    }
  };

  const SimpleBtn = (prop: any) => {
    return (
      <button
        className="btn btn-default"
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
              <div key={"kbd" + idx}>
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
              console.log(result[i]);
              row.push(
                <div key={"r"+i}
                className="w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-white border-slate-200">
                  {result[i] === ' ' ? '-' : result[i]}
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

  return (
    <div className="App">
      <header className="App-header">
      </header>
    <ResultView/>
    {inputData}
    <KeyboardView/>
    </div>
  );
}

export default App;
