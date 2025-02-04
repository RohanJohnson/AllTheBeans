<script lang="ts">
    import { onMount } from "svelte";
    import "../app.css";
    let { children } = $props();

    let navButtonImage: HTMLImageElement | null = null;
    let navLinks: HTMLElement | null = null;
    let menuOpen: boolean = false;

    onMount(async () => {
        navButtonImage = document.querySelector(".nav-button>img");
        navLinks = document.querySelector(".nav-links");

        const mediaQuery = window.matchMedia("(max-width: 800px)");

        const handleMediaChange = (e: any) => {
            if (navLinks && navButtonImage) {
                if (!e.matches) {
                    console.log(e.matches);
                    navLinks.style.display = "flex";
                    navButtonImage.src = "/menu-icon.svg";
                } else {
                    navLinks.style.display = "none";
                    navButtonImage.src = "/menu-icon.svg";
                }
            }
        };

        mediaQuery.addEventListener("change", handleMediaChange);
        handleMediaChange(mediaQuery);
    });

    function openMobileNav(): void {
        console.log(menuOpen);
        if (navLinks != null && navButtonImage != null) {
            if (!menuOpen) {
                navLinks.style.display = "flex";
                navButtonImage.src = "/menu-close-icon.svg";
            } else {
                navLinks.style.display = "none";
                navButtonImage.src = "/menu-icon.svg";
            }
            menuOpen = !menuOpen;
        }
    }
</script>

<nav>
    <button class="nav-button" onclick={openMobileNav}>
        <img src="/menu-icon.svg" alt="Menu" />
    </button>
    <div class="nav-links">
        <a href="/" class="nav-link">Home</a>
        <a href="/discover" class="nav-link">Discover</a>
        <a href="/bean-of-the-day" class="nav-link">Bean of the Day</a>
        <a href="/sign-in" class="nav-link">Sign In</a>
    </div>
</nav>

<style lang="scss">
    .nav {
        &-links {
            display: flex;
            gap: 40px;
        }

        &-link {
            color: #F5EEDC;
            font-size: 20px;
            text-wrap: none;

            &:hover{
                color: #D4A373;
            }
        }

        &-button {
            display: none;
        }

        @media screen and (max-width: 800px) {
            &-links {
                position: fixed;
                right: 0;
                width: 240px;
                display: none;
                transition: 0.5s;
                flex-direction: column;
                gap: 0;
                background-color: #1a0a05;
                margin-top: 23px;
                z-index: 10;
            }

            &-link {
                color: #F5EEDC;
                font-size: 20px;
                padding: 15px 10px;

                &:hover {
                    background-color: #270e06;
                }

                &:active {
                    background-color: #130703;
                }
            }

            &-button {
                display: block;
                width: 50px;
                display: flex;
                justify-content: flex-end;
            }
        }
    }
</style>
