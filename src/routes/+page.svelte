<script lang="ts">
	let semester_selection: string;
	function goto_semester() {
		window.location.href = semester_selection;
	}
</script>

<main class="container">
	<article>
		<form on:submit={goto_semester}>
			<label for="semester">
				Select a semester
				<select id="semester" required bind:value={semester_selection}>
					<option value="" selected disabled>Semester</option>
					<option value="/semester/2024/fall">Fall 2024</option>
				</select>
			</label>
			<button type="submit">Submit</button>
		</form>
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
</style>
