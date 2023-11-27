/** Node Imports */
const CASAuthentication = require('./index');

// Override the default CASAuthentication Logout function
CASAuthentication.prototype.logout = function logoutOverride(req, res) {
  // Destroy the entire session if the option is set.
  if (this.destroy_session) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
    });
  } else {
    // Otherwise, just destroy the CAS session variables.
    delete req.session[this.session_name];
    if (this.session_info) {
      delete req.session[this.session_info];
    }
  }
  // Redirect the client back to the page the request was sent from. **OVERRIDE**
  res.redirect('back');
};

/** Instantiate CASAuthentication */
const cas = new CASAuthentication({
  cas_url: 'https://sso.gatech.edu',
  service_url:
    process.env.NODE_ENV === 'production'
      ? 'https://molevol.ibb.gatech.edu'
      : 'http://localhost:4000',
  session_name: 'casUser',
  session_info: 'casUserInfo',
  // is_dev_mode: true,
  // dev_mode_info: { casUser: 'dev', employee: false, admin: false }
});

const unsupported = (req, res) => {
  res.send('This method is not supported.');
};

const readCasAPI = (req, res) => {
  try {
    if (req.session) {
      if (req.session.casUser) {
        res.json(req.session);
      } else {
        res.json({
          casUser: 'Not authenticated',
          employee: false,
          admin: false,
          firstName: null,
          lastName: null,
        });
      }
    }
  } catch (err) {
    res.status(500).send(`ERROR: ${err}`);
  }
};

//TEST IS FOR TESTING IN DEVELOPMENT
///DO NOT TOUCH!!!
const test = process.env.NODE_ENV === 'production' ? false : true;
//YOU MAY EDIT THIS FIELD, Set 0 for client, 1 for employee, 2 for admin

const testRole = 2;

const employeeController = require('../controllers/employee.js')
const readCasUser = async (req, res) => {
  const admins = await employeeController.getEmployeesAsArray({query: {returnAsArray: true, backendCall: true, admin: true}})
  const employees = await employeeController.getEmployeesAsArray({query: {returnAsArray: true, backendCall: true, admin: false}}); // call function to return employee list here
  if (test) {
    if (testRole === 0) {
      data = {
        casUser: 'testuser',
        employee: false,
        admin: false,
        firstName: 'TFirst',
        lastName: 'TLast',
      };
    } else if (testRole === 1) {
      data = {
        casUser: 'testuser',
        employee: true,
        admin: false,
        firstName: 'TFirst',
        lastName: 'TLast',
      };
    } else if (testRole === 2) {
      data = {
        casUser: 'testuser',
        employee: true,
        admin: true,
        firstName: 'TFirst',
        lastName: 'TLast',
      };
    }
    if (req.params.userCheck) {
      return data;
    }
    if (req.params.userCheck) {
      return data;
    }
    res.json(data);
    return;
  } else {
    try {
      if (req.session) {
        if (req.session[cas.session_name]) {
          var casUserFullName =
            req.session[cas.session_info].gtunmaskeddisplayname.split(' ');
          var firstName = casUserFullName[0];
          var lastName = casUserFullName[casUserFullName.length - 1];
          if (admins.includes(req.session[cas.session_name])) {
            data = {
              casUser: req.session[cas.session_name],
              employee: true,
              admin: true,
              firstName: firstName,
              lastName: lastName,
            };
          } else if (employees.includes(req.session[cas.session_name])) {
            data = {
              casUser: req.session[cas.session_name],
              employee: true,
              admin: false,
              firstName: firstName,
              lastName: lastName,
            };
          } else {
            data = {
              casUser: req.session[cas.session_name],
              employee: false,
              admin: false,
              firstName: firstName,
              lastName: lastName,
            };
          }
          if (req.params.userCheck) {
            return data;
          }
          res.json(data);
        } else {
          data = {
            casUser: 'Not authenticated',
            employee: false,
            admin: false,
            firstName: null,
            lastName: null,
          };
          if (req.params.userCheck) {
            return data;
          }
          res.json(data);
        }
      }
    } catch (err) {
      res.status(500).send(`ERROR: ${err}`);
    }
  }
};

const readCasLogout = (req, res) => {
  try {
    res.json({
      casUser: 'Not authenticated',
      employee: false,
      admin: false,
      firstName: null,
      lastName: null,
    });
  } catch (err) {
    res.status(500).send(`ERROR: ${err}`);
  }
};

const CasAPIController = {
  create: unsupported,
  read: readCasAPI,
  update: unsupported,
  delete: unsupported,
};

const CasUserController = {
  create: unsupported,
  read: readCasUser,
  update: unsupported,
  delete: unsupported,
};

const CasAuthController = {
  create: unsupported,
  read: unsupported,
  update: unsupported,
  delete: unsupported,
};

const CasLogoutController = {
  create: unsupported,
  read: readCasLogout,
  update: unsupported,
  delete: unsupported,
};

module.exports = {
  cas,
  CasAPIController,
  CasUserController,
  CasAuthController,
  CasLogoutController,
};
