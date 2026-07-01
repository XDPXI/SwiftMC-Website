<template>
    <div class="layout-wrapper">
        <DefaultTheme.Layout />

        <footer class="footer-custom">
            <div class="footer-columns">
                <div class="footer-column">
                    <h3>Getting Started</h3>
                    <ul>
                        <li><a href="/download/swift">Download Swift</a></li>
                        <li><a href="/download/breeze">Download Breeze</a></li>
                        <li>
                            <a href="https://docs.xdpxi.dev/swiftmc"
                                >Documentation</a
                            >
                        </li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Swift</h3>
                    <ul>
                        <li>
                            <a
                                href="https://github.com/XDPXI/SwiftMC/discussions"
                                >Discussions</a
                            >
                        </li>
                        <li>
                            <a href="https://github.com/XDPXI/SwiftMC/issues"
                                >Issues</a
                            >
                        </li>
                        <li>
                            <a href="https://github.com/XDPXI/SwiftMC"
                                >Repository</a
                            >
                        </li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Breeze</h3>
                    <ul>
                        <li>
                            <a
                                href="https://github.com/XDPXI/BreezeMC/discussions"
                                >Discussions</a
                            >
                        </li>
                        <li>
                            <a href="https://github.com/XDPXI/BreezeMC/issues"
                                >Issues</a
                            >
                        </li>
                        <li>
                            <a href="https://github.com/XDPXI/BreezeMC"
                                >Repository</a
                            >
                        </li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Legal</h3>
                    <ul>
                        <li>
                            <a
                                href="https://www.minecraft.net/en-us/eula"
                                target="_BLANK"
                                >EULA</a
                            >
                        </li>
                    </ul>
                </div>
            </div>

            <div class="footer-separator"></div>

            <div class="footer-bottom">
                <img
                    src="https://raw.githubusercontent.com/XDPXI/SwiftMC-Website/refs/heads/main/favicon.png"
                    alt="Swift Logo"
                    class="swift-icon"
                />
                <div class="footer-bottom-text">
                    <span class="copyright"
                        >Copyright © 2025-2026 SwiftMC. All rights reserved.</span
                    >
                    <span class="commit-info" v-if="latestCommit">
                        <a href="https://github.com/XDPXI/SwiftMC-Website">XDPXI/SwiftMC-Website</a>
                        @
                        <a :href="`https://github.com/XDPXI/SwiftMC-Website/commit/${latestCommit}`">
                            {{ latestCommit.slice(0, 7) }}
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DefaultTheme from "vitepress/theme";

const latestCommit = ref<string | null>(null);

onMounted(async () => {
    try {
        const response = await fetch(
            "https://api.github.com/repos/XDPXI/SwiftMC-Website/commits?per_page=1"
        );
        const data = await response.json();
        if (data[0]?.sha) {
            latestCommit.value = data[0].sha;
        }
    } catch (error) {
        console.error("Failed to fetch latest commit:", error);
    }
});
</script>

<style scoped>
.footer-custom {
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    padding: 2rem 0;
    margin-top: 2rem;
}

.footer-columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
    margin-bottom: 2rem;
}

.footer-column h3 {
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: var(--vp-c-text-1);
}

.footer-column ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-column li {
    margin-bottom: 0.75rem;
}

.footer-column a {
    color: var(--vp-c-text-2);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
}

.footer-column a:hover {
    color: var(--vp-c-brand);
}

.footer-separator {
    height: 1px;
    background-color: var(--vp-c-divider);
    margin: 2rem auto 2rem auto;
    max-width: calc(1280px + 4rem);
    margin-left: auto;
    margin-right: auto;
}

.footer-bottom {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.swift-icon {
    width: 40px;
    height: 40px;
    object-fit: contain;
    flex-shrink: 0;
}

.footer-bottom-text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-end;
}

.copyright {
    font-size: 0.85rem;
    color: var(--vp-c-text-3);
}

.commit-info {
    font-size: 0.85rem;
    color: var(--vp-c-text-3);
}

.commit-info a {
    color: var(--vp-c-brand);
    text-decoration: none;
    transition: color 0.2s;
}

.commit-info a:hover {
    color: var(--vp-c-brand-light);
}

@media (max-width: 768px) {
    .footer-columns {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
        padding: 0 1rem;
    }

    .footer-bottom {
        padding: 0 1rem;
    }
}

@media (max-width: 480px) {
    .footer-columns {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        padding: 0 1rem;
    }

    .footer-bottom {
        flex-direction: column;
        align-items: flex-start;
    }

    .footer-bottom-text {
        align-items: flex-start;
    }
}
</style>
