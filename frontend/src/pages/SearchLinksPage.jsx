import React from "react";
import { useSelector } from "react-redux";
import { createAuthRequest } from "../apis/backend";
import PageContainer from "../components/PageContainer";

const SearchLinkPage = () => {
  const auth = useSelector((state) => state.auth);
  const request = createAuthRequest(auth.user.token);

  request.get("/links").then(console.log);

  return (
    <PageContainer>
      <div className="field">
        <div className="control is-expanded is-loading is-medium">
          <input
            className="input is-medium "
            type="text"
            placeholder="digite para buscar um link"
          />
        </div>
      </div>
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <th># ID</th>
          <th># Title</th>
          <th># Link</th>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>teste</td>
            <td>teste</td>
          </tr>
          <tr>
            <td>1</td>
            <td>teste</td>
            <td>teste</td>
          </tr>
          <tr>
            <td>1</td>
            <td>teste</td>
            <td>teste</td>
          </tr>
        </tbody>
      </table>
    </PageContainer>
  );
};

export default SearchLinkPage;
