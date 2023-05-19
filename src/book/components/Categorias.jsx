import { Card, CardContent, Divider, Grid, List, ListItem, ListItemText, Typography, makeStyles } from "@mui/material"

export const Categorias = () => {
    return (
        <Card
            component={Grid}
            container
            spacing={0}
            sx={{ width: "450px", height: "min-content", position: "fixed" }}
        >
            <CardContent sx={{ width: '100%' }}>
                <Typography variant="h6" sx={{ pl: '15px' }}>Categorias</Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Acción y Aventura" />
                    </ListItem>
                    <Divider style={{ width: '100%' }} />
                    <ListItem>
                        <ListItemText primary="Amor" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Edad media" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Educación" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Literatura" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Ciencias informaticas" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Sociologia" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Política" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Derecho" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Psicologia" />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )
}
