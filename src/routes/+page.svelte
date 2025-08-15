<script lang="ts">
		let loading = true;
		let step = "Fetching items directly from the SoM Shop";
		import MediaQuery from "../components/MediaQuery.svelte";
		const maxStep = 3;
		let currentStep = 1;
    import { askToAI } from "../api/ai";
    import type { Item } from "../api/parser";
    import { getItems } from "../api/parser";
    import LimitedItem from "../components/LimitedItem.svelte";
    import "../styles/global.css";
    let items: Item[] = [];

    (async () => {
        const data = await getItems();
				step = "Analyzing Items with HackClub AI"
				currentStep = 2;
				let updatedData = [...data];
				try {
					updatedData = await askToAI(data);
				} catch (error) {
					location.reload();
				}
        // @ts-ignore
        updatedData.sort((a, b) => b.ratio - a.ratio);
				step = "Updating Items..."
				currentStep = 3;
        items = updatedData;
        console.log(data)
				loading = false
    })()
</script>

<div class="mainTitle">
    <h1>Is it Worth It ? 🔍</h1>
    <p>Why waste your time digging through the Summer of Making store to figure out what's worth it? Let "Is it worth it?" do the work, and you can get back to coding. I'm not sure if this is allowed under the "Summer of Making" T&Cs. 😓</p>
</div>

<div class="limitedItems">
		<MediaQuery query="(max-width: 480px)" let:matches>
			{#if !matches}
				<h2 style="padding-left: 5rem;">Limited Items</h2>
			{:else}
				<h2 style="padding-left: 1.5rem;">Limited Items</h2>
			{/if}
		</MediaQuery>
    <div class="scrolllist">
        <div class="list">
            <!-- svelte-ignore element_invalid_self_closing_tag -->
						{#if loading}
							<MediaQuery query="(max-width: 480px)" let:matches>
								{#if !matches}
									<div class="space" />
								{:else}
									<div class="mobile" />
								{/if}
							</MediaQuery>
							<div class="loadContainer">
								<p class="loading">Loading...</p>
								<p>Current Step: {step} ({currentStep}/{maxStep})</p>
							</div>
						{/if}
						<MediaQuery query="(max-width: 480px)" let:matches>
							{#if !matches}
								<div class="space" />
							{:else}
								<div class="mobile" />
							{/if}
						</MediaQuery>
            
						{#each items as item}
								{#if item.illustration && item.qtyLeft && item.qtyLeft !== 0}
										<LimitedItem
												image={item.illustration}
												item={item.name}
												description={item.description}
												itemLeft={item.qtyLeft}
												shells={item.price}
												percentage={Math.floor(item.ratio! * 100)}
										/>
								{/if}
						{/each}
            <!-- svelte-ignore element_invalid_self_closing_tag -->
            <div class="space" />
        </div>
    </div>
		<MediaQuery query="(max-width: 480px)" let:matches>
			{#if !matches}
				<h2 style="padding-left: 5rem;">Others Items</h2>
			{:else}
				<h2 style="padding-left: 1.5rem;">Others Items</h2>
			{/if}
		</MediaQuery>
		<MediaQuery query="(max-width: 480px)" let:matches>
			<div class="otherItems{matches ? ' mobile' : ''}">
				{#if loading}
					<div class="loadContainer">
						<p class="loading">Loading...</p>
						<p>Current Step: {step} ({currentStep}/{maxStep})</p>
					</div>
				{/if}
				{#each items as item}
					{#if item.illustration}
						<LimitedItem
							image={item.illustration}
							item={item.name}
							description={item.description}
							itemLeft={item.qtyLeft}
							shells={item.price}
							percentage={Math.floor(item.ratio! * 100)}
						/>
					{/if}
				{/each}
			</div>
		</MediaQuery>
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

		.loading {
			animation: loading 1.5s linear infinite;
		}

		.loadContainer {
			display: flex;
			flex: 1;
			flex-direction: column;
		}

		@keyframes loading {
			0% {
				opacity: 0.25;
			}

			50% {
				opacity: 1;
			}

			100% {
				opacity: 0.25;
			}
		}

		.mobile {
			padding-left: 1.5rem;
		}
</style>