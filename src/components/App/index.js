import React from 'react';
import {
	BrowserRouter as Router,
	Route,
  Switch
} from 'react-router-dom';

import Navigation from '../Navigation';
import PostListPage from '../PostList';
import PostPage from '../Post';

import * as ROUTES from '../../constants/routes';

const App = () => (
	<Router>
		<div>
      <header>
			  <Navigation />
      </header>
      <article>
        <Switch>
          <Route exact path={ROUTES.LANDING} component={PostListPage} />
					<Route exact path={ROUTES.DRAFT_LIST}>
						<PostListPage drafts="true" />
					</Route>
					<Route exact path={'/:postId'} component={PostPage} />
        </Switch>
      </article>
		</div>
	</Router>
);

export default App;
