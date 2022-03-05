import * as React from "react"
import { useState } from "react"

// styles
const pageStyles = {
  color: "#232129",
  padding: 90,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
}
const paragraphStyles = {
}
const imgStyles = {
  margin: 20,
}
const errorStyles = {
  color: 'crimson'
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  borderRadius: 4,
}
const ctaStyles = {
  display: 'block',
  padding: 20,
  fontSize: 'larger'
}

// markup
const IndexPage = () => {
  var [name, setName] = useState("");
  var [img, setImg] = useState("");
  var [url, setUrl] = useState("");
  var [error, setError] = useState("");

  var nameProcessed = name.toLowerCase().replace(/\s/g, '-') || "emoji";

  var getImage = async (url: string) => {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi

    if (expression.test(url)) {
      setError("");
      console.log(`Getting favicon for ${url}...`);

      //TODO: get actual image via netlify function

      setImg("data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E");
    }
    else {
      setError("URL is invalid!")
    }
  }

  var download = () => {
    if (!img) return;

    console.log(`Downloading ${nameProcessed}.png...`);

    //TODO: trigger download
  }

  return (
    <main style={pageStyles}>
      <title>Favicon to Slackmoji</title>
      <h1 style={headingStyles}>
        Get a website's favicon as a Slack Emoji!
      </h1>
      <p style={paragraphStyles}>
        Quickly get the favicon for any website as a PNG, which you can then use as an emoji in Slack.
      </p>
      <p>
        <label>
          URL:<input type="text" onChange={(e) => setUrl(e.target.value)}/>
        </label>
      </p>
      <p>
        <label>
          Emoji name:<input type="text" onChange={(e) => setName(e.target.value)}/>
        </label>
      </p>
      <p>
        <button onClick={() => getImage(url)}>Create my emoji!</button>{" "}
        <span style={errorStyles}>{error}</span>
      </p>
      {img &&
        <>
          <img style={imgStyles} src={img}/>
          <p>
            <code style={codeStyles}>:{nameProcessed}:</code>
          </p>
        </>
      }
      <button style={ctaStyles} disabled={!img} onClick={download}>
        Download{nameProcessed? ` ${nameProcessed}.png` : ''}
      </button>
      <p>
        Built by <a href="https://github.com/tylermercer">Tyler Mercer</a> &middot;{' '}
        <a href="https://github.com/tylermercer/favicon-to-slackmoji">Source</a>
      </p>
    </main>
  )
}

export default IndexPage
