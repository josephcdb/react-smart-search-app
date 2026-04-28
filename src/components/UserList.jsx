import PropTypes from 'prop-types';

function UserList({ users }) {
  return (
    <>
      <h3>List of users:</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserList;