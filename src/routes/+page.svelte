<script lang="ts">
	let semester_selection: string;
	function goto_semester() {
		window.location.href = semester_selection;
	}
</script>

<main class="container">
	<article class="grid">
		<form on:submit={goto_semester}>
			<hgroup>
				<h1>Teaweb v0.0.1</h1>
				<h2>NMT Scheduler</h2>
			</hgroup>
			<label for="year">
				Select a year
				<select id="year" required>
					<option value="" selected disabled>Year</option>
					<option value="2024">2024</option>
				</select>
			</label>
			<label for="semester">
				Select a semester
				<select id="semester" required bind:value={semester_selection}>
					<option value="" selected disabled>Semester</option>
					<option value="/semester/2024/fall">Fall</option>
				</select>
			</label>
			<button type="submit">View classes</button>
		</form>
		<div class="image"></div>
	</article>
</main>

<footer class="container-fluid">
	Copyright (c) 2024 Alexander Bethel &bullet;
	<a href="github.com">Source code</a>
</footer>

<style>
	main {
		padding-top: 20vh;
		min-height: calc(100vh - 6rem);
	}

	article {
		padding: 0px;
		gap: 0px;
	}

	.image {
		display: block;
		background-image: url('/background.jpg');
		background-position: center;
		background-size: cover;
	}

	form {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		margin: 0px;
	}
	hgroup {
		flex-grow: 1;
	}
</style>
