import React from 'react'
import PageContainer from '../components/PageContainer';


const SearchLinkPage = () => {
  return (
    <PageContainer>
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <th>ID</th>
          <th>Title</th>
          <th>Link</th>
          <th>Created at</th>
          <th>Updated at</th>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>teste</td>
            <td>teste</td>
            <td>ttt</td>
            <td>uuu</td>
          </tr>
          <tr>
            <td>1</td>
            <td>teste</td>
            <td>teste</td>
            <td>ttt</td>
            <td>uuu</td>
          </tr>
          <tr>
            <td>1</td>
            <td>teste</td>
            <td>teste</td>
            <td>ttt</td>
            <td>uuu</td>
          </tr>
        </tbody>
      </table>
    </PageContainer>
  );
}

export default SearchLinkPage;
