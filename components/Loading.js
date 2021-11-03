import { CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
            <div>
                <img
                    src="https://www.freepnglogos.com/uploads/whatsapp-logo-png-hd-2.png"
                    alt="logo"
                    height={200}
                    style={{ marginBottom: 10 }}
                />
                <CircularProgress color="success" size={60} />

            </div>
        </center>
    )
}

export default Loading;