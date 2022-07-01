import { Box } from "@/components";

import "./AboutPage.scss"

export const AboutPage = () => {
  return (
    <div className="about-page content-container">
      <Box label="Credits">
        <ul>
          <li>The Hololive talents for giving fans the inspiration to do cool stuff like this game</li>
          <li>Everybody that worked on this game!</li>
          <li>
            <a href="https://www.reddit.com/r/holocure/comments/vkcri9/unlock_conditions/" target="_blank" rel="noopener noreferrer">
              /u/cylindrical418
            </a>
            {' '}on reddit for the unlock conditions
          </li>
          <li>
            Almost everything else on this site was extracted from the game manually, if you see something wrong/missing or have a feature request,{' '}
            <a href="https://github.com/shabla/holocure-infos/issues" target="_blank" rel="noopener noreferrer">create an issue on Github</a>!
          </li>
        </ul>
      </Box>
    </div>
  );
}