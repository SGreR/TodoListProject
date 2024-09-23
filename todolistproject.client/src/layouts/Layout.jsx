import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CustomRouter from '../components/CustomRouter.jsx'
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

function ResponsiveLayout() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                <ListItem
                    key='All'
                    component={Link}
                    to={"/all-tasks" }
                    disablePadding
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <RuleRoundedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'All Tasks'} />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    key='Finished'
                    component={Link}
                    to={"/finished-tasks"}
                    disablePadding
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <CheckBoxRoundedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Finished Tasks'} />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    key='Unfinished'
                    component={Link}
                    to={"/unfinished-tasks"}
                    disablePadding
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <CheckBoxOutlineBlankRoundedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Unfinished Tasks'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to={"/"}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        TodoApp
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <CustomRouter/>
            </Box>
        </Box>
    );
}

export default ResponsiveLayout;
