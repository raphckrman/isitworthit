<script>
    import LimitedItem from "../components/LimitedItem.svelte";
    import "../styles/global.css";
</script>

<div class="mainTitle">
    <h1>Is it Worth It ? 🔍</h1>
    <p>Why waste your time digging through the Summer of Making store to figure out what's worth it? Let "Is it worth it?" do the work, and you can get back to coding. I'm not sure if this is allowed under the "Summer of Making" T&Cs. 😓</p>
</div>

<div class="limitedItems">
    <h2 style="padding-left: 5rem;">Limited Items</h2>
    <div class="scrolllist">
        <div class="list">
            <!-- svelte-ignore element_invalid_self_closing_tag -->
            <div class="space" />

            <div class="space" />
        </div>
    </div>
    <h2 style="padding-left: 5rem;">Others items</h2>
    <div class="otherItems">

    </div>
</div>

<style>
    .scrolllist {
        display: flex;
        gap: 1rem;
        overflow-x: auto;
        overflow-y: hidden;
        max-width: 99.1vw;
        padding-bottom: 1rem;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
    }

    .scrolllist::-webkit-scrollbar {
        display: none; 
    }

    .space {
        padding-right: 4.5rem;
    }

    .otherItems {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        padding: 0 5rem 5rem;
        max-width: 200vh;
    }

    .list {
        flex: 0 0 auto;
        display: flex;
        gap: 10px;
    }
</style>