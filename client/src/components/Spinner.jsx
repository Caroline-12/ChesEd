const Spinner = () => {
  const styles = {
    container: {
      position: "fixed", // Ensures absolute positioning on all pages
      top: 0,
      left: 0,
      width: "100vw", // Fills entire viewport width
      height: "100vh", // Fills entire viewport height
      display: "flex",
      justifyContent: "center", // Horizontally centers the spinner
      alignItems: "center", // Vertically centers the spinner
      backgroundColor: "rgba(0, 0, 0, 0.2)", // Optional: Semi-transparent background
      zIndex: 999, // Ensures spinner stays on top of other content
    },
    spinner: {
      width: "60px", // Adjust spinner size as needed
      height: "60px",
      border: "2px solid #025b0b",
      borderRadius: "50%",
      borderTopColor: "#025b0b", // Ensure top border is visible
      borderBottomColor: "#025b0b", // Ensure bottom border is visible
      animation: "spin 1s linear infinite",
    },
    "@keyframes spin": {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.spinner} />
    </div>
  );
};

export default Spinner;
