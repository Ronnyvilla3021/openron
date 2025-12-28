const handleSubmit = () => {
  const newUser: User = {
    id: user?.id || Date.now().toString(),
    fullName,
    email,
    status: user?.status || 'active',
    createdAt: user?.createdAt || new Date().toISOString(), // ✅ obligatorio
  };
  onSave(newUser);
};
