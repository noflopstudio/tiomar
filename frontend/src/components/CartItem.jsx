export default function CartItem({
    item,
    onRemove,
    onIncrease,
    onDecrease
}) {

    return (
        <div style={styles.card}>

            {/* IMAGE */}
            <div style={styles.imageBox}>

                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.name}
                        style={styles.image}
                    />
                ) : (
                    <div style={styles.noImage}>
                        📦
                    </div>
                )}

            </div>


            {/* INFOS */}
            <div style={styles.info}>

                <h3 style={styles.name}>
                    {item.name}
                </h3>


                <p style={styles.price}>
                    {Number(item.price).toLocaleString()} FCFA
                </p>


                <div style={styles.actions}>

                    <button
                        onClick={() => onDecrease(item.id)}
                        style={styles.qtyButton}
                    >
                        -
                    </button>


                    <span style={styles.quantity}>
                        {item.quantity || 1}
                    </span>


                    <button
                        onClick={() => onIncrease(item.id)}
                        style={styles.qtyButton}
                    >
                        +
                    </button>

                </div>


                <button
                    onClick={() => onRemove(item.id)}
                    style={styles.remove}
                >
                    🗑 Supprimer
                </button>


            </div>

        </div>
    );
}



const styles = {

    card: {
        display: "flex",
        gap: "15px",
        background: "#ffffff",
        padding: "15px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        marginBottom: "15px"
    },


    imageBox: {
        width: "90px",
        height: "90px",
        background: "#f1f5f9",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },


    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },


    noImage: {
        fontSize: "30px"
    },


    info: {
        flex: 1
    },


    name: {
        color: "#0B3D91",
        fontSize: "17px",
        marginBottom: "8px"
    },


    price: {
        color: "#D4A017",
        fontWeight: "800",
        marginBottom: "10px"
    },


    actions: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "10px"
    },


    qtyButton: {
        width: "32px",
        height: "32px",
        borderRadius: "6px",
        background: "#0B3D91",
        color: "#ffffff",
        fontSize: "18px",
        fontWeight: "bold"
    },


    quantity: {
        fontWeight: "700",
        fontSize: "16px"
    },


    remove: {
        background: "#D4A017",
        color: "#0B3D91",
        padding: "8px 12px",
        borderRadius: "6px",
        fontWeight: "700"
    }

};