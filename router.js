import WelcomePage from './src/components/WelcomePage'
import TvShowsOverview from './src/components/TvShowsOverview'
import VueRouter from 'vue-router';

let routes = [
  {
    path: '/',
    component: WelcomePage
  },
  {
    path: '/tv-shows-overview',
    component: TvShowsOverview
  }
];

var router = new VueRouter({ 
    routes: routes,
    mode: 'history'
})

export default router;
