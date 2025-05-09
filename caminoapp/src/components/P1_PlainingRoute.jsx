import MapRoute from "./caminoMap";

function RoutePage() {
  return (
    <div style={{ marginTop: 30 }}>
      <h1
        style={{
          fontSize: "5em",
          position: "absolute",
          top: "92%",
          left: "12%",
          zIndex: 3,
        }}
      >
        點擊想去的路線!
      </h1>
      <MapRoute style={{ zIndex: 1 }} />
    </div>
  );
}
export default RoutePage;
