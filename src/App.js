import "./App.css";
import React, { useState } from "react";
import { css } from "@emotion/react";
import CircleLoader from "react-spinners/CircleLoader";
import Card from "./components/Card";
import Footer from "./components/Footer";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const App = () => {
  const [chap, setChap] = useState("");
  const [verse, setVerse] = useState("");

  const [chapValue, setChapValue] = useState("");
  const [verseValue, setVerseValue] = useState("");

  const [shlokData, setShlokData] = useState([]);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [chapError, setChapError] = useState(false);
  const [verseError, setVerseError] = useState(false);

  // onfocus error is removed
  const chapOnFocusHandler = () => {
    setChapError(false);
  };
  const verseOnFocusHandler = () => {
    setChapError(false);
  };


  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetch(
  //       `https://bhagavadgitaapi.in/slok/${chap}/${verse}?api_key=f3d37247ccb09e11b`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setShlokData(data);
  //         console.log(data);
  //         setIsLoading(false);
  //       })
  //       .catch((err) => console.log(err));
  //   };
  //   const timer = setTimeout(() => {
  //     fetchData();
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [chap, verse]);
  //  const { data } = useFetch(
  //    `https://bhagavadgitaapi.in/slok/${chap}/${verse}?api_key=f3d37247ccb09e11b`
  //  );

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (chap  && verse) {
        setIsLoading(true);

        fetch(
          `https://bhagavadgitaapi.in/slok/${chap}/${verse}?api_key=f3d37247ccb09e11b`
        )
          .then((res) => {
            if (!res.ok) {
              throw Error("Error occured...");
            }
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setShlokData(data);
            setIsLoading(false);
            setError(null);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
            setError(true);
          });
        setChap("");
        setVerse("");
    } else {
      setChapError(true)
      setVerseError(true)
    }

    // setIsLoading(true);

    // fetch(
    //   `https://bhagavadgitaapi.in/slok/${chap}/${verse}?api_key=f3d37247ccb09e11b`
    // )
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw Error("Error occured...");
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setShlokData(data);
    //     setIsLoading(false);
    //     setError(null);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setIsLoading(false);
    //     setError(err.message);
    //   });
    // setChap("");
    // setVerse("");
  };

  // setTimeout(onSubmitHandler, 3000);

  const inputEvent = (e) => {
    console.log(e.target.value);
    setChap(e.target.value);
  };
  const inputEventVerse = (e) => {
    console.log(e.target.value);
    setVerse(e.target.value);
  };

  return (
    <div className="App">
      <div class="flex flex-col h-screen">
        <div className="flex-grow">
          <div className="bg-gradient-to-b from-yellow-400 to-yellow-500 pb-5 h-28">
            <h1 className="mx-auto   text-4xl text-white italic">
              || Hare Krishna ||
            </h1>
            <h4 className="mt-3 text-white italic">
              Search any verse from Bhagavadgita
            </h4>
          </div>
          <div className="content-center mt-4 mb-3 pt-0 ">
            <form>
              <div className="flex justify-center">
                <input
                  type="number"
                  placeholder="Chapter"
                  value={chap}
                  onChange={inputEvent}
                  className={`w-24 mr-2 px-3 py-3 placeholder-yellow-500 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring   ${
                    chapError ? "bg-red-200" : ""
                  }`}
                  onFocus={chapOnFocusHandler}
                />
                <input
                  type="number"
                  placeholder="Verse"
                  value={verse}
                  onChange={inputEventVerse}
                  className={`w-24 mr-2 px-3 py-3 placeholder-yellow-500 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring   ${
                    chapError ? "bg-red-200" : ""
                  }`}
                  onFocus={verseOnFocusHandler}
                />
              </div>
              <div>
                <button
                  className="bg-yellow-500 mt-3 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:shadow hover:bg-yellow-600"
                  type="button"
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  type="submit"
                  onClick={onSubmitHandler}
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {error && <div>Error occured!!!</div>}

          {isLoading ? (
            <div className="mt-20">
              <CircleLoader
                // color={color}
                loading={isLoading}
                css={override}
                color="#FF8C00"
                size={50}
              />
            </div>
          ) : (
            <div>
              <Card>
                <p> Sanskrit : {shlokData.slok}</p>
              </Card>
              <Card>
                <p>Transliteration : {shlokData.transliteration}</p>
              </Card>
              <Card>
                <p>Hindi : {shlokData.tej.ht}</p>
              </Card>
              <Card>
                <p>English : {shlokData.adi.et}</p>
              </Card>
              <Card>
                <p>Explanation Hindi : {shlokData.chinmay.hc}</p>
              </Card>
              <Card className="md-3">
                <p>Explanation English : {shlokData.siva.ec}</p>
              </Card>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
