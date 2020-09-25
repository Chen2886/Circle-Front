import './Profile.css';
import React from 'react';
import { Grid, InputBase, AppBar, Button, Toolbar, IconButton, Typography, Card } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    maxWidth: '180px',
    left: '50%',
    borderRadius: '50%',
  },
  avatarContainer: {
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  spaceBetweenContainer: {
    justifyContent: 'space-between',
    display: 'flex',
    marginLeft: '35px',
    marginRight: '35px',
  },
  cardBody: {
    marginLeft: '50px',
    marginRight: '50px',
  }
}));

const font = "'Tenor Sans', sans-serif";

const theme = createMuiTheme({
  typography: {
    fontFamily: font,
  },
});

export default function Main(props) {
  props.setShowSearchField(false);
  props.setShowLoginButton(false);
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <div class='main-content'>
        <div class='header pb-8 pt-5 pt-lg-8 d-flex align-items-center'>
          <span class='mask bg-gradient-default opacity-8'></span>
          <div class='container-fluid d-flex align-items-center'>
            <div class='row'>
              <div class='col-lg-7 col-md-10'>
                <h1 class='display-2 text-white'>Hello Jesse</h1>
                <p class='text-white mt-0 mb-5'>
                  This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks
                </p>
                <Button variant='outlined'>Edit profile</Button>
              </div>
            </div>
          </div>
        </div>
        <div class='container-fluid' style={{ marginTop: '-70px' }}>
          <div class='row'>
            <div class='col-xl-4 order-xl-2 mb-5 mb-xl-0'>
              <Card>
                <div className={classes.avatarContainer}>
                  <img src='https://demos.creative-tim.com/argon-dashboard/assets/img/theme/team-4.jpg' className={classes.avatar} />
                </div>
                <div className={classes.spaceBetweenContainer}>
                  <Button variant='outlined'>Connect</Button>
                  <Button variant='outlined'>Message</Button>
                </div>
                <div class='card-body'>
                  <div className={classes.spaceBetweenContainer}>
                    <div style={{ float: 'left' }}>22 Friends</div>
                    <div style={{ float: 'right' }}>89 Comment</div>
                  </div>
                  <div class='text-center'>
                    <h3>
                      Jessica Jones<span class='font-weight-light'>, 27</span>
                    </h3>
                    <div class='h5 font-weight-300'>
                      <i class='ni location_pin mr-2'></i>Bucharest, Romania
                    </div>
                    <div class='h5 mt-4'>
                      <i class='ni business_briefcase-24 mr-2'></i>Solution Manager - Creative Tim Officer
                    </div>
                    <div>
                      <i class='ni education_hat mr-2'></i>University of Computer Science
                    </div>
                    <hr class='my-4' />
                    <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
                    <a href='#'>Show more</a>
                  </div>
                </div>
              </Card>
              {/* </div> */}
            </div>
            <div class='col-xl-8 order-xl-1'>
              <div class='card bg-secondary shadow'>
                <div class='card-header bg-white border-0'>
                  <div class='row align-items-center'>
                    <div class='col-8'>
                      <h3 class='mb-0'>My account</h3>
                    </div>
                    <div class='col-4 text-right'>
                      <Button variant='outlined'>Settings</Button>
                    </div>
                  </div>
                </div>
                <div class='card-body'>
                  <form>
                    <h6 class='heading-small text-muted mb-4'>User information</h6>
                    <div class='pl-lg-4'>
                      <div class='row'>
                        <div class='col-lg-6'>
                          <div class='form-group focused'>
                            <label class='form-control-label' for='input-username'>
                              Username
                            </label>
                            <input
                              type='text'
                              id='input-username'
                              class='form-control form-control-alternative'
                              placeholder='Username'
                              value='lucky.jesse'
                            />
                          </div>
                        </div>
                        <div class='col-lg-6'>
                          <div class='form-group'>
                            <label class='form-control-label' for='input-email'>
                              Email address
                            </label>
                            <input type='email' id='input-email' class='form-control form-control-alternative' placeholder='jesse@example.com' />
                          </div>
                        </div>
                      </div>
                      <div class='row'>
                        <div class='col-lg-6'>
                          <div class='form-group focused'>
                            <label class='form-control-label' for='input-first-name'>
                              First name
                            </label>
                            <input
                              type='text'
                              id='input-first-name'
                              class='form-control form-control-alternative'
                              placeholder='First name'
                              value='Lucky'
                            />
                          </div>
                        </div>
                        <div class='col-lg-6'>
                          <div class='form-group focused'>
                            <label class='form-control-label' for='input-last-name'>
                              Last name
                            </label>
                            <input
                              type='text'
                              id='input-last-name'
                              class='form-control form-control-alternative'
                              placeholder='Last name'
                              value='Jesse'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr class='my-4' />
                    <h6 class='heading-small text-muted mb-4'>Contact information</h6>
                    <div class='pl-lg-4'>
                      <div class='row'>
                        <div class='col-md-12'>
                          <div class='form-group focused'>
                            <label class='form-control-label' for='input-address'>
                              Address
                            </label>
                            <input
                              id='input-address'
                              class='form-control form-control-alternative'
                              placeholder='Home Address'
                              value='Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09'
                              type='text'
                            />
                          </div>
                        </div>
                      </div>
                      <div class='row'>
                        <div class='col-lg-4'>
                          <div class='form-group focused'>
                            <label class='form-control-label' for='input-city'>
                              City
                            </label>
                            <input type='text' id='input-city' class='form-control form-control-alternative' placeholder='City' value='New York' />
                          </div>
                        </div>
                        <div class='col-lg-4'>
                          <div class='form-group focused'>
                            <label class='form-control-label' for='input-country'>
                              Country
                            </label>
                            <input
                              type='text'
                              id='input-country'
                              class='form-control form-control-alternative'
                              placeholder='Country'
                              value='United States'
                            />
                          </div>
                        </div>
                        <div class='col-lg-4'>
                          <div class='form-group'>
                            <label class='form-control-label' for='input-country'>
                              Postal code
                            </label>
                            <input type='number' id='input-postal-code' class='form-control form-control-alternative' placeholder='Postal code' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr class='my-4' />
                    <h6 class='heading-small text-muted mb-4'>About me</h6>
                    <div class='pl-lg-4'>
                      <div class='form-group focused'>
                        <label>About Me</label>
                        <textarea rows='4' class='form-control form-control-alternative' placeholder='A few words about you ...'>
                          A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.
                        </textarea>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
}
