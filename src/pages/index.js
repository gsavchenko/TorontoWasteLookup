import React from "react";
import Body from "../components/body";
import Header from "../components/header";
import Search from "../components/search";
import { graphql } from "gatsby";

export default ({ data }) => (
  <div>
    <Header>Toronto Waste Lookup</Header>
    <Body>
      <Search JSONData={data} />
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
