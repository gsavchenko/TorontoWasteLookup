import React from "react";
import Body from "../components/Body";
import Header from "../components/header";
import SearchBar from "../components/SearchBar";
import { graphql } from "gatsby";
import WasteWizardDataManager from "../utils/dataManager";

export default ({ data }) => (
  <div>
    {WasteWizardDataManager.mapWasteWizardKeywords(data)}
    <Header>Toronto Waste Lookup</Header>
    <Body>
      <SearchBar />
    </Body>
  </div>
);

export const query = graphql`
  query {
    allWastewizardJson {
      edges {
        node {
          title
          category
          body
          keywords
        }
      }
    }
  }
`;
