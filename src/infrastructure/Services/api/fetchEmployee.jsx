const fetchEmployeesApi = async () => {
  const response = await fetch('https://dummyjson.com/users');
  if (!response.ok) {
    throw new Error(`Error fetching employees: ${response.statusText}`);
  }
  const data = await response.json();
  
  return data.users.map((user) => {
    const formattedBirthDate = formatDate(user.birthDate);

    const capitalizedGender = user.gender.charAt(0).toUpperCase() + user.gender.slice(1).toLowerCase();

    return {
      name: `${user.firstName} ${user.lastName}`,
      profile: user.image,
      age: user.age,
      salary: Math.floor(Math.random() * 50000 + 30000),
      department: user.company?.department || 'Unknown',
      sex: capitalizedGender,
      birthdate: formattedBirthDate,
    };
  });
};

function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

export default {
  fetchEmployeesApi,
}
